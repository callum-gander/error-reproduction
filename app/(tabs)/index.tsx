import { useLocalSearchParams } from "expo-router"
import { Drawer } from "expo-router/drawer"
import React from "react"
import { ScrollView, Text, View } from "react-native"
import { Tabs, TabsView, type RenderTabsViewProps } from "~/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"
import { TimerReset, MoreHorizontal, Play } from "lucide-react-native"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Link } from "expo-router"

export default function TabOneScreen() {
  const tests = [
    {
      id: 1,
      name: "Test 1",
      // change this to be an array at some point
      test: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      schedule: "Everyday at 6am",
    },
    {
      id: 2,
      name: "Test 2",
      // change this to be an array at some point
      test: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      schedule: "Everyday at 8am",
    },
    {
      id: 3,
      name: "Test 3",
      // change this to be an array at some point
      test: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      schedule: "Everyday at 9am",
    },
  ]
  const name = "Test 1"
  const test = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  const schedule = "Everyday at 6am"

  return (
    <View className="flex-1 justify-start items-center p-6">
      {/* {tests.map(({ id, name, test, schedule }) => ( */}
      <Card className="w-full max-w-xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <View className="flex flex-col gap-2">
            <CardTitle>{name}</CardTitle>
            <CardDescription>{test}</CardDescription>
          </View>
          {/* TODO: put edit and delete in here */}
          <MoreHorizontal className="text-white h-24 w-24" />
        </CardHeader>
        <CardContent className="flex flex-row justify-between gap-8">
          <Link href="/preparation" asChild>
            <Button className="w-44" variant="outline" size="lg">
              <Play className="text-white" />
            </Button>
          </Link>
          <Button className="w-44" variant="outline" size="lg">
            <TimerReset className="text-white" />
          </Button>
        </CardContent>
        <CardFooter className="flex flex-row flex-start">
          <Text className="text-muted-foreground">{schedule}</Text>
        </CardFooter>
      </Card>
      {/* ))} */}
    </View>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
// });
