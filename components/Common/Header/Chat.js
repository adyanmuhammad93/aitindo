import Button from "components/Atom/Button";
import { CgArrowRight } from "react-icons/cg";

export default function Chat() {
  return (
    <div className="relative h-16 w-96">
      <img src="static/images/chat/chat-bg.png" alt="" className="h-full" />
      <div className="absolute inset-0 pl-1 pr-3 w-full h-full flex justify-between items-center">
        <img
          src="static/images/chat/chat-icon.png"
          alt=""
          className="h-full p-2"
        />
        <div className="text-white">
          <p className="font-bold text-sm">Ingin Tebus Resep?</p>
          <p className="text-xs">Tanyakan kebutuhan Anda</p>
        </div>
        <Button
          color="white"
          title="Chat Erika"
          className="text-[11px] rounded-2xl"
          iconRight={<CgArrowRight className="text-base" />}
        />
      </div>
    </div>
  );
}
