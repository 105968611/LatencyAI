import { UploadSimpleIcon } from "@phosphor-icons/react";

import { useCallback, useRef, useState } from "react";
import type { DragEvent, ChangeEvent } from "react";

const ACCEPTED_EXTENSIONS = [".log", ".txt", ".csv"];
const MAX_SIZE_MB = 200;

function Dropzone({ onFile }: { onFile: (file: File) => void }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const validate = useCallback(
        (file: File) => {
            const ext = "." + file.name.split(".").pop()?.toLowerCase();
            if (!ACCEPTED_EXTENSIONS.includes(ext)) {
                setError(`Unsupported file type. Use ${ACCEPTED_EXTENSIONS.join(", ")}.`);
                return;
            }
            if (file.size > MAX_SIZE_MB * 1024 * 1024) {
                setError(`File is larger than ${MAX_SIZE_MB}MB.`);
                return;
            }
            setError(null);
            onFile(file);
        },
        [onFile]
    );

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) validate(file);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) validate(file);
        e.target.value = "";
    };
    return (
        <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`flex flex-col items-center rounded-3xl border-2 border-dashed border-orange-400 px-6 py-14 text-center transition-colors ${dragging ? "bg-orange-100" : "bg-orange-50"
                }`}
        >
            <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-100 text-orange-500">
                <UploadSimpleIcon className="h-7 w-7" />
            </span>

            <p className="mt-6 text-2xl font-medium text-[#0B1437]">Drop your log file here</p>
            <p className="mt-1 text-sm text-[#0B1437]">or click to browse</p>

            <input
                ref={inputRef}
                type="file"
                accept={ACCEPTED_EXTENSIONS.join(",")}
                onChange={handleChange}
                className="hidden"
            />
            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="mt-6 rounded-lg bg-[#0B1437] px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-[#16205a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
            >
                Browse files
            </button>

            <p className="mt-6 text-xs text-slate-600">
                {ACCEPTED_EXTENSIONS.join(" · ")} - up to {MAX_SIZE_MB}MB
            </p>

            {error && (
                <p role="alert" className="mt-3 text-sm font-medium text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
}

export default Dropzone;