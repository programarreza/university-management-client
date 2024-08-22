import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  rules?: object;
};

const PHInput = ({ type, name, label, disabled = false, placeholder, rules = {} }: TInputProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        rules={rules}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input
              {...field}
              type={type}
              id={name}
              placeholder={placeholder || label}
              disabled={disabled}
              size="large"
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHInput;
