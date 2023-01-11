import { Card, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

function Wiki() {
    const [content, setContent] = useState("");

    useEffect(() => {
        fetch("https://raw.githubusercontent.com/wiki/DRincs-Productions/ABFD/Home.md")
            .then((res) => res.text())
            .then((text) => setContent(text));
    }, []);

    return (
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            marginTop={5}
        >
            <Card elevation={24}
                sx={{
                    maxWidth: 1000,
                    padding: 5,
                }}>
                <ReactMarkdown children={content} />
            </Card>
        </Grid>
    );
};

export default Wiki;
