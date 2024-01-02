import { Card } from "@mui/joy";
import { useEffect, useState } from "react";
import Markdown, { UrlTransform } from "react-markdown";
import remarkGfm from 'remark-gfm';
import './Markdown.css';

type IMarkdownCardProps = {
    markdownLink: string,
    transformUrl?: UrlTransform,
    minWidth?: number,
    maxWidth?: number,
}

function MarkdownCard(props: IMarkdownCardProps) {
    const {
        transformUrl = (url, key, node) => {
            return url
        },
        markdownLink: url,
        minWidth,
        maxWidth,
    } = props
    const [text, setText] = useState("");

    useEffect(() => {
        fetch(url)
            .then((res) => res.text())
            .then((text) => setText(text));
    }, [url]);

    return (
        <Card
            sx={{
                maxWidth: maxWidth,
                minWidth: minWidth,
                paddingX: 4,
                paddingY: 2,
            }}
        >
            <Markdown
                children={text}
                remarkPlugins={[remarkGfm]}
                urlTransform={(url, key, node) => {
                    if (key === "src") { // image
                        // https://dzone.com/articles/how-to-style-images-with-markdown
                        return url + '#markdownimg'
                    }
                    return transformUrl(url, key, node)
                }}
            />
        </Card>
    );
};

export default MarkdownCard;
