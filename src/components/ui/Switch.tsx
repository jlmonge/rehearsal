import * as RadixSwitch from "@radix-ui/react-switch";

interface SwitchProps {
  id: string;
  checked?: boolean;
  onCheckedChange?(value: boolean): void;
}

function Switch({ id, checked, onCheckedChange }: SwitchProps) {
  // const rootWidth = 12;
  // const rootXPadding = 1;
  // const thumbWidth = 5;

  return (
    <>
      <RadixSwitch.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        className={`relative w-12 h-6 bg-slate-400 rounded-full data-[state=checked]:bg-slate-800 px-1`}
        id={id}
      >
        <RadixSwitch.SwitchThumb
          className={`block w-4 h-4 bg-slate-50 rounded-full data-[state=checked]:translate-x-6 transition-transform translate-x-0`}
        />
      </RadixSwitch.Root>
    </>
  );
}

/*
function Switch({ id, checked, onCheckedChange }: SwitchProps) {
  const rootWidth = 12;
  const rootXPadding = 1;
  const thumbWidth = 5;

  return (
    <>
      <RadixSwitch.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        className={`relative w-${rootWidth} h-5 bg-slate-400 rounded-full data-[state=checked]:bg-slate-800 px-${rootXPadding}`}
        id={id}
      >
        <RadixSwitch.SwitchThumb
          className={`block w-${thumbWidth} h-3 bg-slate-50 rounded-full data-[state=checked]:translate-x-${
            rootWidth - rootXPadding * 2 - thumbWidth
          } transition-transform translate-x-0`}
        />
      </RadixSwitch.Root>
    </>
  );
}
*/

export default Switch;
