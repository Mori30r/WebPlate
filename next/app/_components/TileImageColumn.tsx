import Image, { StaticImageData } from "next/image";

interface tileImageProps {
    src1: StaticImageData;
    src2: StaticImageData;
    alt1: string;
    alt2: string;
}

export default function TileImageColumn({
    src1,
    src2,
    alt1,
    alt2,
}: tileImageProps) {
    return (
        <div className="flex flex-col w-1/4 overflow-hidden rounded-3xl gap-4">
            <Image
                className={`flex-auto object-cover rounded-3xl transition-all hover:scale-105`}
                src={src1}
                alt={alt1}
                placeholder="blur"
            />
            <Image
                className={`flex-auto object-cover rounded-3xl transition-all hover:scale-105`}
                src={src2}
                alt={alt2}
                placeholder="blur"
            />
        </div>
    );
}
