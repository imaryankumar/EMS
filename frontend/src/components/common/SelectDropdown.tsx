import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectDropdown = ({
  name,
  label,
  items,
  onChange,
  selectedValue,
}: {
  name: string;
  label: string;
  items: string[];
  onChange: (value: string) => void;
  selectedValue: any;
}) => {
  return (
    <Select>
      <SelectTrigger className="w-full py-6">
        <SelectValue placeholder={name} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {items.map((item, index) => (
            <SelectItem key={index} value={item} className="capitalize">
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectDropdown;
