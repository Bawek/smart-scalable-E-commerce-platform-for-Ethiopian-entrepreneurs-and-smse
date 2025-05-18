import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


const statsData = [
    {
        title: "Total Revenue",
        value: "$1,250.00",
        trend: "up",
        change: "+12.5%",
        footerTitle: "Trending up this month",
        footerSubtitle: "Compared to last month",
    },
    {
        title: "Total Orders",
        value: "356",
        trend: "up",
        change: "+8.2%",
        footerTitle: "Order volume increasing",
        footerSubtitle: "Avg. order value: $45.00",
    },
    {
        title: "Average Order Value (AOV)",
        value: "$45.00",
        trend: "down",
        change: "-5.3%",
        footerTitle: "Slightly lower than last month",
        footerSubtitle: "Promotions may help boost AOV",
    },
    {
        title: "New Customers",
        value: "124",
        trend: "up",
        change: "+15%",
        footerTitle: "Acquisition improving",
        footerSubtitle: "25% from referrals",
    },
    {
        title: "Inventory Alert",
        value: "12 items",
        trend: "up",
        change: "+3",
        footerTitle: "Low stock items",
        footerSubtitle: "Replenish soon",
    },
    {
        title: "Top Selling Product",
        value: "Premium Headphones",
        trend: "up",
        change: "+42%",
        footerTitle: "High demand item",
        footerSubtitle: "Restock recommended",
    },

];
export function SectionCards() {
    return (
        <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
            {statsData.map((item, index) => {
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
            })}
        </div>
    )
}
