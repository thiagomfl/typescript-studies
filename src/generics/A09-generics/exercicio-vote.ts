type VotingOption = {
  numberOfVotes: number
  option: string
}

export class Voting {
  private _votingOptions: VotingOption[] = []

  constructor(public details: string) {}

  get votingOptions() {
    return this._votingOptions
  }

  addVotingOpts(votingOpt: VotingOption) {
    this._votingOptions.push(votingOpt)
  }

  vote(votingIdx: number) {
    if (!this._votingOptions[votingIdx]) return

    this._votingOptions[votingIdx].numberOfVotes += 1
  }
}

export class App {
  private votings: Voting[] = []

  addVoting(voting: Voting) {
    this.votings.push(voting)
  }

  showVoting() {
    for (const vote of this.votings) {
      for (const votingOpt of vote.votingOptions) {
        console.log(votingOpt.option, votingOpt.numberOfVotes)
      }
    }
  }
}

const vote1 = new Voting('What\'s your favorite programming language?')
vote1.addVotingOpts({ option: 'Typescript', numberOfVotes: 0 })
vote1.addVotingOpts({ option: 'Javascript', numberOfVotes: 0 })
vote1.addVotingOpts({ option: 'PHP', numberOfVotes: 0 })
vote1.addVotingOpts({ option: 'C#', numberOfVotes: 0 })

const votingApp = new App()
votingApp.addVoting(vote1)

votingApp.showVoting()
