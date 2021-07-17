import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { GeneratorComponent } from "../components/generator";
import { generators } from "./api/generators";

export default function Home() {
    const [showGenerators, setSG] = useState(false);
    const [focused, setFocused] = useState("");

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    });

    useEffect(() => {
        if (focused !== "") document.body.style.overflowY = "visible";
        else document.body.style.overflowY = "scroll";
    }, [focused]);

    const handleKeyDown = (key: KeyboardEvent) => {
        if (key.code === "Escape") closeGen();
    };

    const closeGen = () => {
        setFocused("");
    };

    return (
        <>
            <Head>
                <title>Old Gen Optimizer</title>
                <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            </Head>
            <div className="container">
                <div className="header">
                    <p>Hey, how are you doing?</p>
                    <p>
                        So I made this for make my life easier but now I just
                        want to help for those who want to run old FSG
                        generators locally.
                    </p>
                    <p>
                        If you don{"'"}t have the macro/consumer of this api,
                        you can download it{" "}
                        <a href="https://github.com/ronkzinho/oldgenoptimizer/releases/latest/download/optimizer.zip">
                            here
                        </a>
                        . Also, you should check the{" "}
                        <a href="https://github.com/ronkzinho/oldgenoptimizer/blob/main/README.md">
                            README file
                        </a>{" "}
                        for the requirements, and how to setup everything!
                    </p>
                    <button onClick={() => setSG(!showGenerators)}>
                        {showGenerators ? "Hide" : "Show"} generators
                    </button>
                </div>
                {showGenerators && (
                    <div className="generators">
                        {generators.map((gen) => (
                            <GeneratorComponent
                                key={gen.name}
                                generator={gen}
                                focused={focused === gen.name}
                                setFocused={setFocused}
                                currentFocus={focused}
                                closeGen={closeGen}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
