import React, { useRef } from "react";
import { FTextField, FormProvider } from "../../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Box, Card, Stack, alpha } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { createPostAsync } from "./postSlice";

const yupSchema = Yup.object().shape({
  content: Yup.string().required("Content is required"),
});
const defaultValues = {
  content: "",
  image: "",
};

function PostForm() {
  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    setError,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.post);

  const fileInput = useRef();
  const handleFile = (e) => {
    const file = fileInput.current.files[0];
    if (file) {
      setValue("image", file);
    }
  };
  const onSubmit = (data) => {
    console.log(data);
    dispatch(createPostAsync(data)).then(() => reset());
  };

  return (
    <Card sx={{ p: 1.5 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <FTextField
            name="content"
            fullWidth
            multiline
            rows={4}
            placeholder="How about your today?"
            sx={{
              "& fieldset": {
                borderWidth: `1px !important`,
                borderColor: alpha("#919EAB", 0.32),
              },
            }}
          />
          {/* <FTextField name="image" placeholder="Image" /> */}
          <input type="file" ref={fileInput} onChange={handleFile} />
          <Box
            sx={{
              display: "flex",
              alignItem: "center",
              justifyContent: "flex-end",
            }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              size="small"
              loading={isSubmitting || isLoading}
            >
              Post
            </LoadingButton>
          </Box>
        </Stack>
      </FormProvider>
    </Card>
  );
}

export default PostForm;
