import * as RadixSwitch from "@radix-ui/react-switch";

interface SwitchProps {
  id: string;
}

function Switch({ id }: SwitchProps) {
  return (
    <>
      <RadixSwitch.Root
        className="relative w-12 h-6 bg-slate-400 rounded-full data-[state=checked]:bg-slate-800"
        id={id}
      >
        <RadixSwitch.SwitchThumb className="block w-5 h-5 bg-slate-50 rounded-full data-[state=checked]:translate-x-7 transition-transform translate-x-0" />
      </RadixSwitch.Root>
    </>
  );
}

export default Switch;
