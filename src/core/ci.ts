/** 当前发布版本的 commit ID, 示例值: `d77a52188d8ba0668492bb0f4e8cbd02d470f3be` */
export const COMMIT_ID = import.meta.env.VITE_CI_COMMIT_SHA

/** 当前发布版本的分支名或标签名, 示例值: `master` 或 `1.0.0` */
export const COMMIT_NAME = import.meta.env.VITE_CI_COMMIT_REF_NAME
