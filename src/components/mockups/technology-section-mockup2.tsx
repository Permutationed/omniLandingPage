export default function TechnologySectionMockup2() {
  return (
    <div
      className="opacity-0 translate-x-[-7.5rem] lg:order-1"
      data-ploy-component-type="mockup"
      data-ploy-component-variant="workspace"
    >
      <div className="border-solid border-ploy-neutral-inverse-s1 overflow-x-hidden overflow-y-hidden border-t border-r border-b border-l">
        <div className="border-solid border-ploy-text-primary/10 bg-ploy-background-secondary flex items-center gap-2 px-4 py-3 border-b">
          <div className="flex gap-1.5">
            <span className="bg-red-500 w-2.5 h-2.5 block rounded-full" />
            <span className="bg-amber-500 w-2.5 h-2.5 block rounded-full" />
            <span className="bg-green-500 w-2.5 h-2.5 block rounded-full" />
          </div>
        </div>
        <div className="bg-ploy-background-primary aspect-video relative overflow-x-hidden overflow-y-hidden">
          <video
            src="https://www.tryastraea.com/demo-2.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full max-w-full absolute block object-cover inset-0"
          />
        </div>
      </div>
    </div>
  );
}
