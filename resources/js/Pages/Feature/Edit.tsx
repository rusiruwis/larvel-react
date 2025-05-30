import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Feature } from "@/types";
import { FormEventHandler } from "react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import TextAreaInput from "@/Components/TextAreaInput";

export default function Show({ feature }: { feature: Feature }) {
  const { data, setData, processing, errors, put } = useForm({
    name: feature.name,
    description: feature.description,
  });
  const updateFeature: FormEventHandler = (ev) => {
    ev.preventDefault();
    put(route("feature.update",feature.id), {
      preserveScroll: true,
    });
  };
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Edit feature: <b>"{feature.name}"</b>
        </h2>
      }
    >
      <Head title={'Edit feature' + feature.name} />

      <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
        <div className="flex gap-8 p-6 text-gray-900 dark:text-gray-100">
          <form onSubmit={updateFeature} className="w-full">
            <div className="mb-8">
              <InputLabel htmlFor="name" value="Name" />

              <TextInput
                id="name"
                className="block w-full mt-1"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                required
                isFocused
                autoComplete="name"
              />

              <InputError className="mt-2" message={errors.name} />
            </div>

            <div className="mb-8">
              <InputLabel htmlFor="description" value="Description" />

              <TextAreaInput
                id="description"
                className="block w-full mt-1"
                rows={10}
                value={data.description}
                onChange={(e) => setData("description", e.target.value)}
              />

              <InputError className="mt-2" message={errors.description} />
            </div>

            <div className="flex items-center gap-4">
              <PrimaryButton disabled={processing}>Save</PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
