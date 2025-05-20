import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export function SectionCards({statsData}) {
    return (
        <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
            {
                statsData && statsData.length > 0 ? (
                    statsData.map((item, index) => {
                        const isUp = item.trend === "up"
                        const TrendIcon = isUp ? TrendingUpIcon : TrendingDownIcon

                        return (
                            <Card className="@container/card" key={index}>
                                <CardHeader className="relative">
                                    <CardDescription>{item.title}</CardDescription>
                                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                                        {item.value}
                                    </CardTitle>
                                    <div className="absolute right-4 top-4">
                                        <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                                            <TrendIcon className="size-3" />
                                            {item.change}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardFooter className="flex-col items-start gap-1 text-sm">
                                    <div className="line-clamp-1 flex gap-2 font-medium">
                                        {item.footerTitle} <TrendIcon className="size-4" />
                                    </div>
                                    <div className="text-muted-foreground">
                                        {item.footerSubtitle}
                                    </div>
                                </CardFooter>
                            </Card>
                        )
                    })

                )
                    : (
                            <p className="px-5 min-w-full flex justify-center items-center text-orange-600">No Activity Recorded till Now!.</p>
                    )
            }
        </div>
    )
}
