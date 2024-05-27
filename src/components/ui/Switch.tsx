import * as RadixSwitch from "@radix-ui/react-switch";

interface SwitchProps {
  id: string;
  checked?: boolean;
  onCheckedChange?(value: boolean): void;
}

function Switch({ id, checked, onCheckedChange }: SwitchProps) {
  const rootWidth = 12;
  const rootXPadding = 1;
  const thumbWidth = 5;

  return (
    <>
      <RadixSwitch.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        className={`relative w-${rootWidth} h-7 bg-slate-400 rounded-full data-[state=checked]:bg-slate-800 px-${rootXPadding}`}
        id={id}
      >
        <RadixSwitch.SwitchThumb
          className={`block w-${thumbWidth} h-5 bg-slate-50 rounded-full data-[state=checked]:translate-x-${
            rootWidth - rootXPadding * 2 - thumbWidth
          } transition-transform translate-x-0`}
        />
      </RadixSwitch.Root>
    </>
  );
}

export default Switch;
