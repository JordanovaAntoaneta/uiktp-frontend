import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

const QuestionsProfPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        bgcolor: "#f0f2ff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        py: 6,
      }}
    >
      <Box
        sx={{
          width: 600,
          bgcolor: "#fff",
          borderRadius: 2,
          boxShadow: 3,
          px: 5,
          py: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 3,
            color: "black",
          }}
        >
          Question 1
        </Typography>

        {/* Answer A */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            width: "100%",
          }}
        >
          <Box
            sx={{
              bgcolor: "#e0d9d9",
              color: "#000",
              width: 32,
              height: 32,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              mr: 2,
            }}
          >
            A
          </Box>
          <TextField
            placeholder="Write answer here"
            variant="outlined"
            fullWidth
            sx={{
              bgcolor: "#f5f4f9",
              borderRadius: 2,
            }}
          />
        </Box>

        {/* Answer B */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            width: "100%",
          }}
        >
          <Box
            sx={{
              bgcolor: "#e0d9d9",
              color: "#000",
              width: 32,
              height: 32,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              mr: 2,
            }}
          >
            B
          </Box>
          <TextField
            placeholder="Write answer here"
            variant="outlined"
            fullWidth
            sx={{
              bgcolor: "#f5f4f9",
              borderRadius: 2,
            }}
          />
        </Box>

        {/* Answer C */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            width: "100%",
          }}
        >
          <Box
            sx={{
              bgcolor: "#e0d9d9",
              color: "#000",
              width: 32,
              height: 32,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              mr: 2,
            }}
          >
            C
          </Box>
          <TextField
            placeholder="Write answer here"
            variant="outlined"
            fullWidth
            sx={{
              bgcolor: "#f5f4f9",
              borderRadius: 2,
            }}
          />
        </Box>

        {/* Add another choice button */}
        <Button
          variant="contained"
          sx={{
            bgcolor: "#b6b1c9",
            width: "100%",
            mt: 1,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": {
              bgcolor: "#a49fb7",
            },
          }}
        >
          Add another choice
        </Button>

        {/* Bottom Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            mt: 4,
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            disabled
            sx={{
              bgcolor: "#c6c2d1",
              borderRadius: 2,
              px: 4,
              textTransform: "none",
            }}
          >
            Done
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#6e64e8",
              borderRadius: 2,
              px: 4,
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": {
                bgcolor: "#574fd9",
              },
            }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionsProfPage;
