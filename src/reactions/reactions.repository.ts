import { Reaction } from "./reactions.model";

export const ReactionsRepository = {
    provide: 'REACTIONS_REPOSITORY',
    useValue: Reaction
}