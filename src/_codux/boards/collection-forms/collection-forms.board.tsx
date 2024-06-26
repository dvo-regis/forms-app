import { createBoard } from '@wixc3/react-board';
import { CollectionForms } from '../../../components/collection-forms/collection-forms';

export default createBoard({
    name: 'CollectionForms',
    Board: () => <CollectionForms />,
    isSnippet: true,
    environmentProps: {
       canvasWidth: 948.9055893349205,
        windowWidth: 2487,
        windowHeight: 640,
    },
});
