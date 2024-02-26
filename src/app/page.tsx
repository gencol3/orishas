import Image from "next/image";
import Header from "./ui/header";
import DisplayPost from "./ui/displayPost";

export default function Home() {
  return (
    <main>
      <Header>
      </Header>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div>
      <DisplayPost />
      </div>
    </main>
  );
}
