import { Layout } from "../../features/example/components/Layout";
import { MainLayout } from "./MainLayout";

export const Example = () => (
    <MainLayout title={"Example"}>
        <h1>Example</h1>
        <Layout />
    </MainLayout>
)