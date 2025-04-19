"use client";
import HomeContent from "@/components/Home";
import { Box, Container, Typography } from "@mui/material";

export default function Home() {
    return (
        <main>
            <Container>
                <Box textAlign="center" mt={5} bgcolor="#f5f5f5">
                    <Typography variant="h3" fontFamily={"monospace"}>
                        The Best URL Shortener
                    </Typography>
                    <Typography variant="subtitle1" color="purple" fontFamily={"monospace"}>
                      🙂 Try shortening your URLs! 🙂
                    </Typography>
                </Box>
                <Box bgcolor="#f5f5f5">
                    <HomeContent />
                </Box>
            </Container>
        </main>
    );
}