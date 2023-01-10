const HowToTranslate = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/wiki/DonRP/AmityPark/Home.md")
      .then((res) => res.text())
      .then((text) => setContent(text));
  }, []);

  return (
    <div className="post">
      <ReactMarkdown children={content} />
    </div>
  );
};

export default HowToTranslate;
