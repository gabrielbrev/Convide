interface Props {
    children?: React.ReactNode;
}

export function Header({ children }: Props) {
    return (
        <div className="flex flex-col max-h-screen">
            <header className="w-full h-12 flex flex-none justify-center items-center border-b bg-white">
                <h1 className="text-2xl font-bold">Convide</h1>
            </header>
            <main className="flex size-full overflow-clip">{children}</main>
        </div>
    );
}
