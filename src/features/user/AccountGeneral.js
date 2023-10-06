import React from "react";
import { Box, Grid, Card, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, FTextField } from "../../components/form";
import { useDispatch, useSelector } from "react-redux";
import { updateAccountAsync } from "./userSlice";

const UpdateUserSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
});

function AccountGeneral({ account }) {
  const isLoading = useSelector((state) => state.user.isLoading);

  const defaultValues = {
    name: account?.name || "",
    email: account?.email || "",
    jobTitle: account?.jobTitle || "",
    company: account?.company || "",
    avatarUrl: account?.avatarUrl || "",
    coverUrl: account?.coverUrl || "",
    phoneNumber: account?.phoneNumber || "",
    address: account?.address || "",
    city: account?.city || "",
    country: account?.country || "",
    aboutMe: account?.aboutMe || "",
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(updateAccountAsync({ id: account._id, ...data }));
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: "center" }}>Avatar Update</Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: "grid",
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                },
              }}
            >
              <FTextField name="name" label="Name" />
              <FTextField name="email" label="Email" disabled />

              <FTextField name="jobTitle" label="Job Title" />
              <FTextField name="company" label="Company" />

              <FTextField name="phoneNumber" label="Phone Number" />
              <FTextField name="address" label="Address" />

              <FTextField name="city" label="City" />
              <FTextField name="country" label="Country" />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <FTextField name="coverUrl" label="Home Profile Cover Image" />
              <FTextField name="aboutMe" multiline rows={4} label="About Me" />

              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting || isLoading}
              >
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

export default AccountGeneral;