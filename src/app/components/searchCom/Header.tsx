import SearchBar from "./SearchBar";

interface HeaderProps {
  email: string | undefined;
}

export default function Header({ email }: HeaderProps) {
  return <SearchBar email={email} />;
}
