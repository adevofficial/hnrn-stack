// import { Row } from "antd";
// import { ConfigContext } from "antd/lib/config-provider";
// import { FormContext, FormItemContext } from "antd/lib/form/context";
// import { ValidateStatus } from "antd/lib/form/FormItem";
// import FormItemInput, { FormItemInputProps } from "antd/lib/form/FormItemInput";
// import FormItemLabel, {
//   FormItemLabelProps,
//   LabelTooltipType,
// } from "antd/lib/form/FormItemLabel";
// import classNames from "classnames";
// import { omit } from "lodash";
// import React, { useContext } from "react";

// export interface FormItemProps<Values = any>
//   extends FormItemLabelProps,
//     FormItemInputProps {
//   prefixCls?: string;
//   noStyle?: boolean;
//   style?: React.CSSProperties;
//   className?: string;
//   name: string;
//   children?: React.ReactNode;
//   id?: string;
//   hasFeedback?: boolean;
//   validateStatus?: ValidateStatus;
//   required?: boolean;
//   hidden?: boolean;
//   initialValue?: any;
//   messageVariables?: Record<string, string>;
//   tooltip?: LabelTooltipType;
// }
// export default function FieldItem(props: FormItemProps) {
//   const {
//     name,
//     noStyle,
//     prefixCls: customizePrefixCls,
//     style,
//     className,
//     hasFeedback,
//     help,
//     validateStatus,
//     children,
//     required,
//     label,
//     messageVariables,
//     hidden,
//     ...restProps
//   } = props;
//   const { getPrefixCls } = useContext(ConfigContext);
//   const { name: formName, requiredMark } = useContext(FormContext);
//   const { updateItemErrors } = useContext(FormItemContext);
//   const [domErrorVisible, innerSetDomErrorVisible] = React.useState(!!help);
//   const prefixCls = getPrefixCls("form", customizePrefixCls);

//   function renderLayout(
//     baseChildren: React.ReactNode,
//     fieldId?: string,
//     isRequired?: boolean
//   ): React.ReactNode {
//     if (noStyle && !hidden) {
//       return baseChildren;
//     }
//     const meta = {};
//     // ======================== Errors ========================
//     // >>> collect sub errors
//     let subErrorList: string[] = [];
//     Object.keys(inlineErrors).forEach((subName) => {
//       subErrorList = [...subErrorList, ...(inlineErrors[subName] || [])];
//     });

//     // >>> merged errors
//     let mergedErrors: React.ReactNode[];
//     if (help !== undefined && help !== null) {
//       mergedErrors = toArray(help);
//     } else {
//       mergedErrors = meta ? meta.errors : [];
//       mergedErrors = [...mergedErrors, ...subErrorList];
//     }

//     // ======================== Status ========================
//     let mergedValidateStatus: ValidateStatus = "";
//     if (validateStatus !== undefined) {
//       mergedValidateStatus = validateStatus;
//     } else if (meta?.validating) {
//       mergedValidateStatus = "validating";
//     } else if (meta?.errors?.length || subErrorList.length) {
//       mergedValidateStatus = "error";
//     } else if (meta?.touched) {
//       mergedValidateStatus = "success";
//     }

//     const itemClassName = {
//       [`${prefixCls}-item`]: true,
//       [`${prefixCls}-item-with-help`]: domErrorVisible || !!help,
//       [`${className}`]: !!className,

//       // Status
//       [`${prefixCls}-item-has-feedback`]: mergedValidateStatus && hasFeedback,
//       [`${prefixCls}-item-has-success`]: mergedValidateStatus === "success",
//       [`${prefixCls}-item-has-warning`]: mergedValidateStatus === "warning",
//       [`${prefixCls}-item-has-error`]: mergedValidateStatus === "error",
//       [`${prefixCls}-item-is-validating`]:
//         mergedValidateStatus === "validating",
//       [`${prefixCls}-item-hidden`]: hidden,
//     };

//     // ======================= Children =======================
//     return (
//       <Row
//         className={classNames(itemClassName)}
//         style={style}
//         key="row"
//         {...omit(restProps, [
//           "colon",
//           "extra",
//           "getValueFromEvent",
//           "getValueProps",
//           "htmlFor",
//           "id", // It is deprecated because `htmlFor` is its replacement.
//           "initialValue",
//           "isListField",
//           "labelAlign",
//           "labelCol",
//           "normalize",
//           "preserve",
//           "tooltip",
//           "validateFirst",
//           "valuePropName",
//           "wrapperCol",
//           "_internalItemRender" as any,
//         ])}
//       >
//         {/* Label */}
//         <FormItemLabel
//           htmlFor={fieldId}
//           required={isRequired}
//           requiredMark={requiredMark}
//           {...props}
//           prefixCls={prefixCls}
//         />
//         {/* Input Group */}
//         <FormItemInput
//           {...props}
//           {...meta}
//           errors={mergedErrors}
//           prefixCls={prefixCls}
//           status={mergedValidateStatus}
//           onDomErrorVisibleChange={setDomErrorVisible}
//           validateStatus={mergedValidateStatus}
//         >
//           {baseChildren}
//         </FormItemInput>
//       </Row>
//     );
//   }

//   return <div></div>;
// }
export {};
