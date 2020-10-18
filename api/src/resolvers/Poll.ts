import { Mutation, Query, Resolver, Arg } from 'type-graphql';
import { getConnection, Repository } from 'typeorm';
import {
  iPhonePoll,
  iPhonePollInput,
  iPhonePollFilter
} from '../entities/Poll';

@Resolver(iPhonePoll)
export class PollResolver {
  @Query(() => [iPhonePoll])
  async iphonePolls(): Promise<iPhonePoll[]> {
    const pollRepo = getConnection().getRepository(iPhonePoll);

    return await pollRepo.find();
  }

  @Query(() => [iPhonePoll])
  async filteredPolls(
    @Arg('filter') filter: iPhonePollFilter
  ): Promise<iPhonePollFilter[]> {
    const pollRepo = getConnection().getRepository(iPhonePoll);

    return await pollRepo.find({ where: filter });
  }

  @Mutation(() => iPhonePoll)
  async createPollEntry(
    @Arg('input') input: iPhonePollInput
  ): Promise<iPhonePoll> {
    const pollRepo = getConnection().getRepository(iPhonePoll);

    return await pollRepo.save(input);
  }
}
