type FeatureItemProps = {
  title: string;
};

function FeatureItem({ title }: FeatureItemProps) {
  return (
    <span className="border-solid border-ploy-neutral-primary-s3 text-[rgb(170,170,170)] leading-[1.33333] font-medium text-xs block px-3 py-1 border-t border-r border-b border-l">
      {title}
    </span>
  );
}

export const features: FeatureItemProps[] = [
  { title: "Protocol" },
  { title: "Site Select" },
  { title: "Recruitment" },
  { title: "Screening 0%" },
  { title: "Treatment" },
  { title: "Data Lock" },
  { title: "Analysis" },
];

export default function PlatformFeatureSection({
  items = features,
}: {
  items?: FeatureItemProps[];
}) {
  return (
    <section
      id="platform"
      className="bg-ploy-neutral-primary-s0 h-[200vh] relative"
    >
      <div className="h-[calc(-60px_+_100vh)] sticky flex items-center top-[3.75rem]">
        <div className="w-full max-w-[82.5rem] mx-auto px-8">
          <div className="grid items-center gap-[3.75rem] grid-cols-1 lg:grid-cols-2 max-lg:grid-cols-[repeat(1,minmax(0px,1fr))] lg:grid-cols-[repeat(2,minmax(0px,1fr))]">
            <div>
              <h2 className="font-heading tracking-[-0.38px] leading-[1.1] font-semibold text-[2.375rem] mt-0 mb-4">
                Automated data orchestration.
              </h2>
              <p className="leading-relaxed my-0">
                Track every stage of clinical data analysis from a single
                interface. From raw and cleaned datasets to SDTM, ADaM, TFL,
                DSUR, IB and final outputs, everything stays visible.
              </p>
            </div>
            <div className="opacity-0 translate-y-[6.25rem] scale-90">
              <div className="border-solid border-ploy-neutral-inverse-s1 bg-ploy-neutral-primary-s0 overflow-x-hidden overflow-y-hidden border-t border-r border-b border-l">
                <div className="border-solid border-ploy-neutral-primary-s3 flex items-center gap-2 px-4 py-3 border-b">
                  <span className="bg-red-500 w-2 h-2 block rounded-full" />
                  <span className="bg-amber-500 w-2 h-2 block rounded-full" />
                  <span className="bg-green-500 w-2 h-2 block rounded-full" />
                  <span className="text-ploy-text-secondary leading-[1.33333] text-xs block ml-2">
                    Astraea Trial Dashboard
                  </span>
                  <span className="flex items-center gap-1 ml-auto">
                    <span className="bg-green-500 w-1.5 h-1.5 block rounded-full" />
                    <span className="text-ploy-text-secondary text-xs block">
                      Live
                    </span>
                  </span>
                </div>
                <div className="p-5">
                  <div className="bg-ploy-neutral-primary-s3 h-1.5 overflow-x-hidden overflow-y-hidden mb-5 rounded-br-[3px] rounded-t-[3px] rounded-bl-[3px]">
                    <div className="bg-ploy-background-inverse w-[0%] h-full rounded-br-[3px] rounded-t-[3px] rounded-bl-[3px]" />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((item, index) => (
                      <FeatureItem key={index} {...item} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
