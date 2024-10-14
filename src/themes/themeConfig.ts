import  Colors  from "@/styles/variables.module.sass";
import type { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    fontSize: 16,
    colorPrimary: Colors.primaryColor,
    colorBgContainer: Colors.bgContainer,
    colorTextSecondary: Colors.textSecondary,
    colorTextDisabled: Colors.textDisabled,
    colorBorder: Colors.borderColor,
  },
};
export default theme;
