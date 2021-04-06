import { ColProps } from "antd";
import { ConfigContext } from "antd/lib/config-provider";
import SizeContext, {
  SizeContextProvider,
  SizeType,
} from "antd/lib/config-provider/SizeContext";
import { FormContext, FormContextProps } from "antd/lib/form/context";
import { FormLayout, RequiredMark } from "antd/lib/form/Form";
import { FormLabelAlign } from "antd/lib/form/interface";
import classNames from "classnames";
import React, { useMemo } from "react";
import {
  FieldValues,
  FormProvider,
  UnpackNestedValue,
  UseFormReturn,
} from "react-hook-form";

interface FormCustomProps {
  children?: React.ReactNode;
  formHook: UseFormReturn;
  onSubmit?: (
    data: UnpackNestedValue<FieldValues>,
    event?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => any | Promise<any>;
  prefixCls?: string;
  colon?: boolean;
  name?: string;
  className?: string;
  layout?: FormLayout;
  labelAlign?: FormLabelAlign;
  labelCol?: ColProps;
  wrapperCol?: ColProps;
  size?: SizeType;
  requiredMark?: RequiredMark;
}

export default function FormCustom({
  formHook,
  children,
  onSubmit = () => {},
  ...props
}: FormCustomProps) {
  const contextSize = React.useContext(SizeContext);
  const { getPrefixCls, direction, form: contextForm } = React.useContext(
    ConfigContext
  );

  const {
    prefixCls: customizePrefixCls,
    className = "",
    size = contextSize,
    colon,
    labelAlign,
    labelCol,
    wrapperCol,
    layout = "horizontal",
    requiredMark,
    name,
  } = props;

  const mergedRequiredMark = useMemo(() => {
    if (requiredMark !== undefined) {
      return requiredMark;
    }

    if (contextForm && contextForm.requiredMark !== undefined) {
      return contextForm.requiredMark;
    }

    return true;
  }, [requiredMark, contextForm]);

  const prefixCls = getPrefixCls("form", customizePrefixCls);

  const formClassName = classNames(
    prefixCls,
    {
      [`${prefixCls}-${layout}`]: true,
      [`${prefixCls}-hide-required-mark`]: mergedRequiredMark === false,
      [`${prefixCls}-rtl`]: direction === "rtl",
      [`${prefixCls}-${size}`]: size,
    },
    className
  );

  const formContextValue = useMemo<FormContextProps>(
    () => ({
      name,
      labelAlign,
      labelCol,
      wrapperCol,
      vertical: layout === "vertical",
      colon,
      requiredMark: mergedRequiredMark,
      itemRef: (name: (string | number)[]) => (node: React.ReactElement) =>
        null,
    }),
    [name, labelAlign, labelCol, wrapperCol, layout, colon, mergedRequiredMark]
  );

  return (
    <FormProvider {...formHook}>
      <form
        id={name}
        name={name}
        className={formClassName}
        onSubmit={formHook.handleSubmit(onSubmit)}
      >
        <SizeContextProvider size={size}>
          <FormContext.Provider value={formContextValue}>
            {children}
          </FormContext.Provider>
        </SizeContextProvider>
      </form>
    </FormProvider>
  );
}
