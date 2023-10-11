import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center p-1">
      <Link href="/" className="cursor-pointer">
        <Image src="/youtube.png" alt="Youtube Logo" width={90} height={20} />
      </Link>
    </div>
  );
}
