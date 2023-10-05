"use client"

import { useCallback, useMemo, useState } from "react"
import Link from "next/link"
import { Icons } from "@components/icons"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@lib/utils"
import { Button, buttonVariants } from "@ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form"
import { Input } from "@ui/input"
import { Textarea } from "@ui/textarea"
import type { FileWithPath } from "@uploadthing/react"
import { useDropzone } from "@uploadthing/react/hooks"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"
import { create } from "zustand"

interface UploadStore {
  files: File[]
  onRemove: (name: string) => void
  setFiles: (newFiles: File[]) => void
}

const useUploadStore = create<UploadStore>((set, get) => ({
  files: [],
  setFiles: (files) => set({ files }),
  onRemove: (name) =>
    set({ files: get().files.filter((file) => file.name !== name) }),
}))

function bytesToKB(bytes: number) {
  return (bytes / 1024).toFixed(2)
}

const ImagePreviews = ({ files }: { files: FileWithPath[] }) => {
  const { onRemove } = useUploadStore()

  const images = useMemo(() => {
    return files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      size: bytesToKB(file.size),
    }))
  }, [files])

  const onRemoveFile = useCallback((name: string) => onRemove(name), [])

  return (
    <div className="grid gap-2">
      {images.map((image) => (
        <div
          key={image.url}
          className="flex items-center justify-between gap-4"
        >
          <img
            src={image.url}
            className="h-12 w-12 rounded-lg object-cover shadow-sm"
          />
          <p className="flex-1 text-xs text-muted-foreground">
            {image.size} KB
          </p>
          <Link
            target="_blank"
            href={image.url}
            className={cn(buttonVariants({ size: "icon", variant: "outline" }))}
          >
            <Icons.eye className="h-4 w-4" />
          </Link>
          <Button
            onClick={() => onRemoveFile(image.name)}
            size={"icon"}
            variant={"outline"}
          >
            <Icons.trash className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  )
}

const UploadModal = () => {
  const [open, setOpen] = useState(false)
  const { files, setFiles } = useUploadStore()
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    if (acceptedFiles.length > 3) {
      return toast.error("error to upload file")
    }
    setFiles(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {},
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full text-foreground/80" variant={"outline"}>
          <Icons.upload className="mr-2 h-4 w-4" />
          Upload Images
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Upload Images</DialogTitle>
        </DialogHeader>
        <div
          {...getRootProps()}
          className="flex h-48 w-full items-center justify-center rounded-lg border-2 border-dashed p-0.5 transition-all hover:border-primary/50"
        >
          <input {...getInputProps()} />
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-[inherit] transition-all hover:bg-primary/10">
            <div className="rounded-full border bg-background p-3 shadow-sm">
              <Icons.upload className="text-primfo h-5 w-5 text-primary" />
            </div>
            <div className="space-y-1 text-center text-sm text-muted-foreground">
              <p>Upload your Image</p>
              <p>JPG or PNG - Max Size: 4MB</p>
              <p>Max Length: 3 file</p>
            </div>
          </div>
        </div>
        {files.length ? <ImagePreviews files={files} /> : null}
        <Button
          onClick={() => setOpen(false)}
          disabled={!files.length}
          variant={"outline"}
        >
          Upload
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export const CreatePinModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button rounded>
          <Icons.add_product className="mr-2 h-4 w-4" />
          New Pin
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Create new Pin</DialogTitle>
        </DialogHeader>
        <CreateForm />
      </DialogContent>
    </Dialog>
  )
}

const pinSchema = z.object({
  title: z.string().min(3).trim(),
  description: z.string().min(10).trim(),
})

type TPinSchema = z.infer<typeof pinSchema>

const CreateForm = () => {
  const { files } = useUploadStore()
  const form = useForm<TPinSchema>({
    resolver: zodResolver(pinSchema),
    defaultValues: { title: "", description: "" },
  })
  const onSubmit = (data: TPinSchema) => {
    console.log(data, files)
  }
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <UploadModal />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Pin</Button>
      </form>
    </Form>
  )
}
