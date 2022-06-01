/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo, useState } from "react";
import { useCustomerLabCategoryQuery } from "./query";

// eslint-disable-next-line import/prefer-default-export
export const useLabCategoryCacheSelector = (initialSearch: string) => {
  const [search, setSearch] = useState(initialSearch);
  const { data, loading } = useCustomerLabCategoryQuery({
    showError: true,
    enabled: search !== "",
    search,
    retry: false,
  });

  const examList: Schemas.CategoryExamData[] = useMemo(() => {
    const exams: Schemas.CategoryExamData[] = [];
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    data &&
      data.map((exam) => {
        if (exam && exam.exams) exams.push(...exam.exams);
      });
    return exams;
  }, [data]);

  return {
    categories: data,
    examList,
    setSearch,
    loading,
  };
};
