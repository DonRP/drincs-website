import { Card } from "@mui/joy";
import { useEffect, useState } from "react";
import { ElementContent, TransformLink } from "react-markdown/lib/ast-to-react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from 'remark-gfm';
import './Markdown.css';

type IMarkdownCardProps = {
    markdownLink: string,
    transformLinkUri?: TransformLink,
    minWidth?: number,
}

function MarkdownCard(props: IMarkdownCardProps) {
    const [text, setText] = useState("");
    const url = props.markdownLink;
    const transformLinkUri = props.transformLinkUri;
    const minWidth = props.minWidth;

    useEffect(() => {
        fetch(url)
            .then((res) => res.text())
            .then((text) => setText(text));
    }, [url]);

    return (
        <Card
            // elevation={24}
            sx={{
                maxWidth: 1000,
                minWidth: minWidth,
                paddingX: 4,
                paddingY: 2,
            }}
        >
            <ReactMarkdown
                children={text}
                remarkPlugins={[remarkGfm]}
                // https://dzone.com/articles/how-to-style-images-with-markdown
                transformImageUri={(src: string, alt: string, title: string | null) => {
                    return src + '#markdownimg'
                }}
                transformLinkUri={transformLinkUri ? transformLinkUri : (href: string, children: Array<ElementContent>, title: string | null) => {
                    return href
                }}
            />
        </Card>
    );
};

export default MarkdownCard;
