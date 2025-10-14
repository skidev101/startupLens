import { formatDate } from "@/lib/utils";
import { Startup, Author } from "@/sanity/types";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type StartupCardType = Omit<Startup, "author"> & { author?: Author }

const StartupCard = ({ post }: { post: StartupCardType }) => {
  const {
    _createdAt,
    views,
    author,
    title,
    category,
    _id,
    description,
    image,
  } = post;

  return (
    <li className="startup-card">
      <div className="flex-between group">
        <p className="bg-purple-200 font-medium rounded-full text-sm px-4 py-1">{formatDate(_createdAt)}</p>

        <div className="flex-between gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._createdAt}`}>
            <p className="text-16-medium line-clamp-1">{author?.username}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>

        <Link href={`/user/${author?._id}`}>
          <Image
            src={image || "/default-avatar.webp"}
            alt="placeholder"
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>

      <Link href={`/startup/${_id}`}>
        <p className="startup-card_desc">{description}</p>

        <img src={image} alt="startup-image" className="startup-card_img" />
      </Link>


      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>
        <button className="startup-card_btn" >
          <Link href={`/startup/${_id}`}>Details</Link>
        </button>
      </div>
    </li>
  );
};

export default StartupCard;
