import { useEffect, useState } from "react";
import deviceService from "../services/device-service";
import { labels, labels2 } from "../data/labels";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner";

const FormSchema = z.object({
    nombre: z.string(),
    porcentaje: z.number(),
    visible: z.boolean()
})



const HackMode = () => {

    const [fakeData, setfakeData] = useState<any>(null);

    useEffect(() => {
        deviceService.getByIdRealtime('4EuSOQMKWzbFhNeZQ17h', (x) => {
            console.log("🚀 ~ deviceService.getByIdRealtime ~ x:", x)
            setfakeData(x)
        })
    }, [])

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            ...fakeData,
            porcentaje: Number(fakeData?.porcentaje) ?? 0
        }
    })

    const onSubmit = (data: z.infer<typeof FormSchema>) => {

        toast.promise(deviceService.update({
            ...data,
            id: '4EuSOQMKWzbFhNeZQ17h'
        }), {
            success: 'Se actualizo correctamente',
            error: 'Ocurrio un error al actualizar',
            loading: 'Actualizando...'
        })
    }

    useEffect(() => {
        console.log("🚀 ~ useEffect ~ fakeData:", fakeData)
        form.setValue('porcentaje', Number(fakeData?.porcentaje) ?? 0)
        form.setValue('nombre', fakeData?.nombre)
        form.setValue('visible', fakeData?.visible)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fakeData, form])


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 px-4 pt-10 max-w-2xl mx-auto z-0 relative">
                <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-white">Nombre</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona una danza" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="w-full">
                                    {labels2.map((dance) => (
                                        <SelectItem key={dance} value={dance}>{dance}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="porcentaje"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-white">Porcentaje</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="shadcn" {...field} onChange={(e) => field.onChange(+e.target.value)} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="visible"
                    render={({ field }) => (
                        <FormItem className="bg-white flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>

                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    Hacer Visible
                                </FormLabel>
                            </div>
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full">Evniar</Button>
            </form>

            {/* 
          <form className="mx-2 grid place-content-center h-[calc(100vh-var(--header-height))]">
            HACK MODE
            <br />
            DANZA

            <Select value={data.nombre || undefined} onValueChange={(e) => setData((prev) => ({ ...prev, nombre: e }))}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccioan una camara" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Camaras</SelectLabel>
                        {labels2.map((dance) => (
                            <SelectItem key={dance} value={dance}>{dance}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>


            <br />
            PORCENTAJE <input type="number" value={data.porcentaje} onChange={e => setData((prev) => ({ ...prev, porcentaje: e.target.value }))} />
            <br />
            <input type="checkbox" onChange={(e) => {

                setData((prev) => ({ ...prev, visible: e.target.checked }))
            }} />

            <br />
            <button onClick={() => {
                deviceService.update({
                    ...data,
                    id: '4EuSOQMKWzbFhNeZQ17h'
                })
            }}> ACTAULZIAR</button>

        </form> */}
        </Form>


    )
}

export default HackMode;
