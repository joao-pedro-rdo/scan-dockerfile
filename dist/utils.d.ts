interface IEntry {
    name: string;
    path: string;
    type: "file" | "directory";
    size?: number;
}
declare const finder: ({ dir, file, ignore, onlyFiles, }: {
    dir: string;
    file: string;
    ignore: string[];
    onlyFiles?: boolean;
}) => Promise<string[]>;
declare const listDirectory: (dir: string) => Promise<{
    path: string;
    files: IEntry[];
    directories: IEntry[];
    total: number;
}>;
declare const showDirectoryListing: (dir: string) => Promise<void>;
export { finder, listDirectory, showDirectoryListing };
