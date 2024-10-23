import { useQuery } from "@apollo/client";
import { DocumentNode } from "graphql";
import { GraphQlKeyEnum } from "./graphql-query.enum";

export function graphQlMapper<T>  (key: GraphQlKeyEnum, query: DocumentNode) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const queryData = useQuery(query);

    if(queryData.data) {
        return queryData?.data[key]?.graphdata as T; 
    }

    return null;
} 