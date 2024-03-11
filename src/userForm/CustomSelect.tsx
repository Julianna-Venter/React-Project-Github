import Select from "react-select";

interface Option {
  value: any;
  label: string;
}

interface Props {
  onChange: (value: any) => void;
  options: Option[];
  value: any;
  className?: string;
  placeholder?: string;
}

const CustomSelect: React.FC<Props> = ({
  onChange,
  options,
  value,
  className,
  placeholder,
}) => {
  const defaultValue = (options: Option[], value: any) => {
    return options
      ? options.find((option) => option.value === value)
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
