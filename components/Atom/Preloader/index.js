import './index.module.css';

export default function Preloader() {
  return (
    <div className="h-screen w-full z-[200] bg-white/75 fixed top-0 left-0 flex items-center justify-center">
      <div className="sk-chase">
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
      </div>
    </div>
  );
}
