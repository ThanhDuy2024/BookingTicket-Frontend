"use client"

import { GetCategoryMovie } from "@/app/api/admin/categoryApi"
import { useEffect, useState } from "react"
import { toast } from "sonner"


interface Category {
  id: string
  name: string
}

interface MovieFormData {
  name: string
  originalName: string
  description: string
  trailerUrl: string
  duration: string
  releaseDate: string
  country: string
  ageRating: string
  status: string
  imdbRating: string
  actors: string
  categoryList: string[]
  image: File | null
}

export default function CreateMoviePage() {
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [previewImage, setPreviewImage] = useState<string>("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);

        const data = await GetCategoryMovie();
        setCategories(data.data)
        console.log(data.data)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]

    if (!file) return

    setFormData((prev) => ({
      ...prev,
      image: file,
    }))

    const imageUrl = URL.createObjectURL(file)

    setPreviewImage(imageUrl)
  }

  const [formData, setFormData] =
    useState<MovieFormData>({
      name: "The Dark Knight",
      originalName: "The Dark Knight",
      description:
        "Batman raises the stakes in his war on crime and faces the Joker.",
      trailerUrl:
        "https://www.youtube.com/watch?v=EXeTwQWrcwY",
      duration: "152",
      releaseDate: "2008-07-18",
      country: "USA",
      ageRating: "",
      status: "",
      imdbRating: "9.0",
      actors:
        "Christian Bale, Heath Ledger, Aaron Eckhart",
      categoryList: [],
      image: null,
    })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleToggleCategory = (
    categoryId: string
  ) => {
    setFormData((prev) => {
      const exists =
        prev.categoryList.includes(categoryId)

      if (exists) {
        return {
          ...prev,
          categoryList:
            prev.categoryList.filter(
              (id) => id !== categoryId
            ),
        }
      }

      return {
        ...prev,
        categoryList: [
          ...prev.categoryList,
          categoryId,
        ],
      }
    })
  }
  const validateForm = () => {
    const newErrors: Record<string, string> =
      {}

    if (!formData.name.trim()) {
      toast.warning("Hãy nhập tên phim")
      newErrors.name =
        "Hãy nhập tên phim"
    }

    if (!formData.originalName.trim()) {
      toast.warning("Hãy nhập tên gốc")
      newErrors.originalName =
        "Hãy nhập tên gốc"
    }

    if (!formData.description.trim()) {
      toast.warning("Hãy nhập mô tả")
      newErrors.description =
        "Hãy nhập mô tả"
    }

    if (!formData.trailerUrl.trim()) {
      toast.warning("Hãy nhập trailer URL")
      newErrors.trailerUrl =
        "Hãy nhập trailer URL"
    }

    if (!formData.duration.trim()) {
      toast.warning("Hãy nhập thời lượng")
      newErrors.duration =
        "Hãy nhập thời lượng"
    }

    if (!formData.releaseDate.trim()) {
      toast.warning("Hãy chọn ngày phát hành")
      newErrors.releaseDate =
        "Hãy chọn ngày phát hành"
    }

    if (!formData.country.trim()) {
      toast.warning("Hãy nhập quốc gia")
      newErrors.country =
        "Hãy nhập quốc gia"
    }

    if (!formData.ageRating.trim()) {
      toast.warning("Hãy chọn giới hạn tuổi")
      newErrors.ageRating =
        "Hãy chọn giới hạn tuổi"
    }

    if (!formData.imdbRating.trim()) {
      toast.warning("Hãy nhập IMDb Rating")
      newErrors.imdbRating =
        "Hãy nhập IMDb Rating"
    }

    if (!formData.actors.trim()) {
      toast.warning("Hãy nhập diễn viên")
      newErrors.actors =
        "Hãy nhập diễn viên"
    }

    if (
      formData.categoryList.length === 0
    ) {
      toast.warning("Hãy chọn thể loại")
      newErrors.categoryList =
        "Hãy chọn thể loại"
    }

    setErrors(newErrors)

    return Object.keys(newErrors)
      .length === 0
  }
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    const isValid = validateForm()

    if (!isValid) return

    try {
      setLoading(true)

      const movieFormData = new FormData()

      movieFormData.append(
        "name",
        formData.name
      )

      movieFormData.append(
        "originalName",
        formData.originalName
      )

      movieFormData.append(
        "description",
        formData.description
      )

      movieFormData.append(
        "trailerUrl",
        formData.trailerUrl
      )

      movieFormData.append(
        "duration",
        formData.duration
      )

      movieFormData.append(
        "releaseDate",
        formData.releaseDate
      )

      movieFormData.append(
        "country",
        formData.country
      )

      movieFormData.append(
        "ageRating",
        formData.ageRating
      )

      movieFormData.append(
        "status",
        formData.status
      )

      movieFormData.append(
        "imdbRating",
        formData.imdbRating
      )

      movieFormData.append(
        "actors",
        formData.actors
      )

      movieFormData.append(
        "categoryList",
        JSON.stringify(
          formData.categoryList
        )
      )

      if (formData.image) {
        movieFormData.append(
          "image",
          formData.image
        )
      }

      console.log(formData)

      // const response = await axios.post(
      //   "/api/movie/create",
      //   movieFormData,
      //   {
      //     headers: {
      //       "Content-Type":
      //         "multipart/form-data",
      //     },
      //   }
      // )

      // console.log(response.data)

      alert("Tạo movie thành công!")
    } catch (error) {
      console.error(error)
      alert("Có lỗi xảy ra!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] p-8">
      <div className="mx-auto max-w-[1400px]">
        {/* HEADER */}
        <div className="mb-8">
          <h1
            className="
              text-5xl
              font-black
              text-[#111827]
            "
          >
            Tạo Movie
          </h1>

          <p
            className="
              mt-2
              text-xl
              text-gray-500
            "
          >
            Thêm movie mới vào hệ thống
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="
            rounded-[32px]
            bg-white
            p-10
            shadow-sm
          "
        >
          <div className="grid gap-7 md:grid-cols-2">
            {/* NAME */}
            <div>
              <label
                className="
                  mb-3 block
                  text-lg font-medium
                  text-gray-500
                "
              >
                Tên phim
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="
                  input h-14 w-full
                  rounded-2xl
                  border border-gray-200
                  bg-white text-lg
                "
              />


              {errors.name && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.name}
                </p>
              )}
            </div>

            {/* ORIGINAL NAME */}
            <div>
              <label
                className="
                  mb-3 block
                  text-lg font-medium
                  text-gray-500
                "
              >
                Tên gốc
              </label>

              <input
                type="text"
                name="originalName"
                value={
                  formData.originalName
                }
                onChange={handleChange}
                className="
                  input h-14 w-full
                  rounded-2xl
                  border border-gray-200
                  bg-white text-lg
                "
              />

              {errors.originName && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.originalName}
                </p>
              )}
            </div>

            {/* DURATION */}
            <div>
              <label
                className="
                  mb-3 block
                  text-lg font-medium
                  text-gray-500
                "
              >
                Thời lượng
              </label>

              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="
                  input h-14 w-full
                  rounded-2xl
                  border border-gray-200
                  bg-white text-lg
                "
              />

              {errors.duration && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.duration}
                </p>
              )}
            </div>

            {/* RELEASE DATE */}
            <div>
              <label
                className="
                  mb-3 block
                  text-lg font-medium
                  text-gray-500
                "
              >
                Ngày phát hành
              </label>

              <input
                type="date"
                name="releaseDate"
                value={
                  formData.releaseDate
                }
                onChange={handleChange}
                className="
                  input h-14 w-full
                  rounded-2xl
                  border border-gray-200
                  bg-white text-lg
                "
              />

              {errors.releaseDate && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.releaseDate}
                </p>
              )}
            </div>

            {/* COUNTRY */}
            <div>
              <label
                className="
                  mb-3 block
                  text-lg font-medium
                  text-gray-500
                "
              >
                Quốc gia
              </label>

              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="
                  input h-14 w-full
                  rounded-2xl
                  border border-gray-200
                  bg-white text-lg
                "
              />
              {errors.country && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.country}
                </p>
              )}
            </div>

            {/* IMDB */}
            <div>
              <label
                className="
                  mb-3 block
                  text-lg font-medium
                  text-gray-500
                "
              >
                IMDb Rating
              </label>

              <input
                type="number"
                step="0.1"
                name="imdbRating"
                value={
                  formData.imdbRating
                }
                onChange={handleChange}
                className="
                  input h-14 w-full
                  rounded-2xl
                  border border-gray-200
                  bg-white text-lg
                "
              />
              {errors.imdbRating && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.imdbRating}
                </p>
              )}
            </div>

            {/* AGE */}
            <div>
              <label
                className="
                  mb-3 block
                  text-lg font-medium
                  text-gray-500
                "
              >
                Giới hạn tuổi
              </label>

              <select
                name="ageRating"
                value={formData.ageRating}
                onChange={handleChange}
                className="
                  select h-14 w-full
                  rounded-2xl
                  border border-gray-200
                  bg-white text-lg
                "
              >
                <option value="G">
                  G
                </option>

                <option value="PG">
                  PG
                </option>

                <option value="PG-13">
                  PG-13
                </option>

                <option value="R">
                  R
                </option>
              </select>
              {errors.ageRating && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.ageRating}
                </p>
              )}
            </div>

            {/* STATUS */}
            <div>
              <label
                className="
                  mb-3 block
                  text-lg font-medium
                  text-gray-500
                "
              >
                Trạng thái
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="
                  select h-14 w-full
                  rounded-2xl
                  border border-gray-200
                  bg-white text-lg
                "
              >
                <option value="active">
                  Active
                </option>

                <option value="inactive">
                  Inactive
                </option>
              </select>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-7">
            <label
              className="
                mb-3 block
                text-lg font-medium
                text-gray-500
              "
            >
              Mô tả
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="
                textarea w-full
                rounded-3xl
                border border-gray-200
                bg-white
                p-5 text-lg
              "
            />
            {errors.description && (
              <p className="mt-2 text-sm text-red-500">
                {errors.description}
              </p>
            )}
          </div>

          {/* TRAILER */}
          <div className="mt-7">
            <label
              className="
                mb-3 block
                text-lg font-medium
                text-gray-500
              "
            >
              Trailer URL
            </label>

            <input
              type="text"
              name="trailerUrl"
              value={formData.trailerUrl}
              onChange={handleChange}
              className="
                input h-14 w-full
                rounded-2xl
                border border-gray-200
                bg-white text-lg
              "
            />
            {errors.trailerUrl && (
              <p className="mt-2 text-sm text-red-500">
                {errors.trailerUrl}
              </p>
            )}
          </div>

          {/* ACTORS */}
          <div className="mt-7">
            <label
              className="
                mb-3 block
                text-lg font-medium
                text-gray-500
              "
            >
              Diễn viên
            </label>

            <textarea
              name="actors"
              value={formData.actors}
              onChange={handleChange}
              rows={3}
              className="
                textarea w-full
                rounded-3xl
                border border-gray-200
                bg-white
                p-5 text-lg
              "
            />
            {errors.actors && (
              <p className="mt-2 text-sm text-red-500">
                {errors.actors}
              </p>
            )}
          </div>

          {/* CATEGORY */}
          <div className="mt-7">
            <label
              className="
                mb-4 block
                text-lg font-medium
                text-gray-500
              "
            >
              Thể loại phim
            </label>

            <div className="flex flex-wrap gap-4">
              {categories.map(
                (category) => {
                  const isSelected =
                    formData.categoryList.includes(
                      category.id
                    )

                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() =>
                        handleToggleCategory(
                          category.id
                        )
                      }
                      className={`
                        rounded-2xl
                        border
                        px-5 py-3
                        text-base
                        font-semibold
                        transition-all

                        ${isSelected
                          ? `
                              border-violet-600
                              bg-violet-600
                              text-white
                            `
                          : `
                              border-gray-200
                              bg-white
                              text-gray-700
                              hover:border-violet-400
                            `
                        }
                      `}
                    >
                      {category.name}
                    </button>
                  )
                }
              )}
              {errors.categoryList && (
                <p className="mt-3 text-sm text-red-500">
                  {errors.categoryList}
                </p>
              )}
            </div>
          </div>

          {/* IMAGE */}
          <div className="mt-7">
            <label
              className="
      mb-3 block
      text-lg font-medium
      text-gray-500
    "
            >
              Upload ảnh
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="
      file-input
      file-input-bordered
      h-14 w-full
      rounded-2xl
      border-gray-200
      bg-white
    "
            />

            {/* PREVIEW IMAGE */}
            {previewImage && (
              <div className="mt-5">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="
          h-[400px]
          w-full
          rounded-3xl
          object-contain
          border border-gray-200
        "
                />
              </div>
            )}
          </div>

          {/* BUTTON */}
          <div className="mt-10 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="
                btn h-14
                rounded-2xl
                border-0
                bg-violet-600
                px-10
                text-lg
                font-bold
                text-white
                hover:bg-violet-700
              "
            >
              {loading
                ? "Đang tạo..."
                : "Tạo Movie"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}