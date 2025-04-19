"use server";

import getCollection, { ENTRIES_COLLECTION } from "@/db";
import { EntryProps } from "@/types";
import getUrl from "./findUrl";

function isLoop(url: string): boolean {
    return url.startsWith("https://cs391-url-shortener.vercel.app") || url.startsWith("http://localhost:3000");
}

function isUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

async function checkUrl(url: string): Promise<void> {
    if (!isUrl(url)) throw new Error("Bad URL");

    try {
        const res = await fetch(url);
        if (
        res.ok ||
        (res.status >= 300 && res.status < 400) ||
        (res.status >= 400 && res.status !== 404)
        ) return;
        console.error(`Bad status: ${res.status} for ${url}`);
    } catch (err) {
        console.error(`Fetch fail: ${url}`, err);
        throw new Error("Unreachable URL");
    }

    throw new Error("Unreachable URL");
}

export default async function insertUrl(entry: EntryProps): Promise<string> {
    const { url, alias } = entry;

    if (!url || !alias) return "Missing input";
    if (isLoop(url)) return "Cycle not allowed";
    if (encodeURIComponent(alias) !== alias) return "Bad alias";

    try {
        await checkUrl(url);
    } catch (err: any) {
        return err.message || "Bad URL";
    }

    if (await getUrl(alias)) return "Alias exists";

    const db = await getCollection(ENTRIES_COLLECTION);
    const res = await db.insertOne({ alias, url });

    return res.acknowledged ? "" : "Insert failed";
}
