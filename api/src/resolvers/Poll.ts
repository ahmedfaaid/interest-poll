import { Mutation, Query, Resolver, Arg, Int } from 'type-graphql';
import { getConnection, Repository } from 'typeorm';
import {
  iPhonePoll,
  iPhonePollInput,
  iPhonePollFilter
} from '../entities/Poll';

@Resolver(iPhonePoll)
export class PollResolver {
  @Query(() => [iPhonePoll])
  async iphonePolls(
    @Arg('limit', () => Int) limit: number,
    @Arg('skip', () => Int, { nullable: true }) skip: number,
    @Arg('filter', { nullable: true }) filter: iPhonePollFilter,
    @Arg('date', { nullable: true }) date: Date
  ): Promise<iPhonePoll[]> {
    const pollRepo = getConnection().getRepository(iPhonePoll);

    const take = limit;

    if (date && filter) {
      // if a date and filter are provided
      const firstResults = await pollRepo.find({
        where: filter,
        order: { createdAt: 'DESC' },
        take,
        skip
      });

      const dateResults = await firstResults.filter(
        result =>
          new Date(result.createdAt).setHours(0, 0, 0, 0) ===
          new Date(date).setHours(0, 0, 0, 0)
      );

      return dateResults;
    } else if (date && !filter) {
      // if only a date is provided
      const firstResults = await pollRepo.find({
        order: { createdAt: 'DESC' },
        take,
        skip
      });

      const dateResults = await firstResults.filter(
        result =>
          new Date(result.createdAt).setHours(0, 0, 0, 0) ===
          new Date(date).setHours(0, 0, 0, 0)
      );

      return dateResults;
    } else if (!date && filter) {
      // if only a filter is provided
      return await pollRepo.find({
        where: filter,
        order: { createdAt: 'DESC' },
        take,
        skip
      });
    } else {
      return await pollRepo.find({
        order: { createdAt: 'DESC' },
        take,
        skip
      });
    }
  }

  // @Query(() => [iPhonePoll])
  // async filteredPolls(
  //   @Arg('limit', () => Int) limit: number,
  //   @Arg('skip', () => Int, { nullable: true }) skip: number,
  //   @Arg('filter', { nullable: true }) filter: iPhonePollFilter,
  //   @Arg('date', { nullable: true }) date: Date
  // ): Promise<iPhonePollFilter[]> {
  //   const pollRepo = getConnection().getRepository(iPhonePoll);

  //   const take = limit;

  //   if (date && filter) {
  //     // if a date and filter are provided
  //     const firstResults = await pollRepo.find({
  //       where: filter,
  //       order: { createdAt: 'DESC' },
  //       take,
  //       skip
  //     });

  //     const dateResults = await firstResults.filter(
  //       result =>
  //         new Date(result.createdAt).setHours(0, 0, 0, 0) ===
  //         new Date(date).setHours(0, 0, 0, 0)
  //     );

  //     return dateResults;
  //   } else if (date && !filter) {
  //     // if only a date is provided
  //     const firstResults = await pollRepo.find({
  //       order: { createdAt: 'DESC' },
  //       take,
  //       skip
  //     });

  //     const dateResults = await firstResults.filter(
  //       result =>
  //         new Date(result.createdAt).setHours(0, 0, 0, 0) ===
  //         new Date(date).setHours(0, 0, 0, 0)
  //     );

  //     return dateResults;
  //   } else {
  //     // if only a filter is provided
  //     return await pollRepo.find({ where: filter });
  //   }
  // }

  @Mutation(() => iPhonePoll)
  async createPollEntry(
    @Arg('input') input: iPhonePollInput
  ): Promise<iPhonePoll> {
    const pollRepo = getConnection().getRepository(iPhonePoll);

    return await pollRepo.save(input);
  }
}
