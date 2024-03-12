import Select from "react-select";

export interface Option {
  value: string;
  label: string;
}

interface Props {
  onChange: (value: Option | null) => void;
  options: Option[];
  value: Option | null;
  className: string;
  placeholder: string;
}

const CustomSelect: React.FC<Props> = ({
  onChange,
  options,
  value,
  className,
  placeholder,
}) => {
  const defaultValue = (options: Option[], value: Option | null) => {
    return options
      ? options.find((option) => option.value === (value?.value || ""))
      : undefined;
  };

  return (
    <Select
      onChange={(selectedValue) => onChange(selectedValue)}
      options={options}
      value={defaultValue(options, value)}
      className={className}
      placeholder={placeholder}
    />
  );
};

export default CustomSelect;
