export interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange: (value: boolean) => void;
  containerClassName?: string;
  disabled?: boolean;
}
