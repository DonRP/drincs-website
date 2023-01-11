import { Card } from "@mui/material";
import { useEffect, useState } from "react";
import { ElementContent } from "react-markdown/lib/ast-to-react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import '../Markdown.css';
type IMarkdownCardProps = {
    markdownLink: string
}

function MarkdownCard(props: IMarkdownCardProps) {
    const [text, setText] = useState("");
    const url = props.markdownLink;

    useEffect(() => {
        fetch(url)
            .then((res) => res.text())
            .then((text) => setText(text));
    }, [url]);

    return (
        <Card elevation={24}
            sx={{
                maxWidth: 1000,
                padding: 5,
            }}>
            <ReactMarkdown
                children={text}
                // https://dzone.com/articles/how-to-style-images-with-markdown
                transformImageUri={(src: string, alt: string, title: string | null) => {
                    return ``
                }}
                transformLinkUri={(href: string, children: Array<ElementContent>, title: string | null) => {
                    return href
                }}
            />
        </Card>
    );
};

export default MarkdownCard;
