import React from 'react'
import {
  View, ScrollView, StatusBar, SafeAreaView,
} from 'react-native'
// import theme from './theme/styles'
import Theme from './theme'

const App = function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Theme.colors.primary.main }}>
      <StatusBar barStyle="light-content" />
      <View style={[Theme.styles.container]}>
        <ScrollView>
          <Theme.View flex={0}>
            <Theme.Text
              style={{ color: Theme.colors.primary.accent }}
            >
            Hi! Here are my themed components.
            </Theme.Text>
          </Theme.View>
          <Theme.Text variant="small" style={[Theme.styles.borderSecondary]}>
          Stare out cat door then go back inside sit in window and stare oooh, a bird,
          yum so purr while eating but touch my tail, i shred your hand purrrr need to
          chase tail jumps off balcony gives owner dead mouse at present then poops in litter.
          </Theme.Text>
          <Theme.Text>
          box snatches yarn and fights with dog cat chases laser then plays in
          grass finds tiny spot in cupboard and sleeps all day jumps in bathtub
          and meows when owner fills food dish the cat knocks over the food dish
          cat slides down the water slide and into pool and swims even though it
          does not like water but wake up human for food at 4am. Chew iPad power
          cord eat all the power cords or leave hair on owner's clothes purr, more napping.
          </Theme.Text>
          <Theme.Text variant="large">
          more napping all the napping is exhausting kitten is playing with dead
          mouse and leave fur on owners clothes. Stare at owner accusingly then
          wink under the bed, so eat owner's food. Kitten is playing with dead mouse.
          Mark territory who's the baby meeeeouw yet while happily ignoring when
          being called. Sniff other cat's butt and hang jaw half open thereafter give
          attitude, for if it fits i sits, but push your water glass on the floor for
          while happily ignoring when being called.
          </Theme.Text>
          <Theme.Text variant="small" style={[Theme.styles.borderSecondary]}>
          Stare out cat door then go back inside sit in window and stare oooh, a bird,
          yum so purr while eating but touch my tail, i shred your hand purrrr need to
          chase tail jumps off balcony gives owner dead mouse at present then poops in litter.
          </Theme.Text>
          <Theme.Text>
          box snatches yarn and fights with dog cat chases laser then plays in
          grass finds tiny spot in cupboard and sleeps all day jumps in bathtub
          and meows when owner fills food dish the cat knocks over the food dish
          cat slides down the water slide and into pool and swims even though it
          does not like water but wake up human for food at 4am. Chew iPad power
          cord eat all the power cords or leave hair on owner's clothes purr, more napping.
          </Theme.Text>
          <Theme.Text variant="large">
          more napping all the napping is exhausting kitten is playing with dead
          mouse and leave fur on owners clothes. Stare at owner accusingly then
          wink under the bed, so eat owner's food. Kitten is playing with dead mouse.
          Mark territory who's the baby meeeeouw yet while happily ignoring when
          being called. Sniff other cat's butt and hang jaw half open thereafter give
          attitude, for if it fits i sits, but push your water glass on the floor for
          while happily ignoring when being called.
          </Theme.Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default App
