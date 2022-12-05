
export type CircleProps = {
    radius: number
    color: string
}

export function Circle({ radius, color }: CircleProps) {

    return(
        <div
            style={{
                width: `${radius}px`,
                height: `${radius}px`,

                backgroundColor: color,

                borderRadius: "9999px"
            }}
        />
    )
}