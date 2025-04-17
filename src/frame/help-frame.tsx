export function HelpFrame() {
    return (
        <div class="frame-container help-frame p-4">
            <h2 class="text-2xl font-bold mb-2 text-blue-500">Getting Started Guide</h2>
            
            <section class="mt-6">
                <h3 class="text-xl font-semibold mb-4">How to Start the Game</h3>
                <ol class="list-decimal pl-6 mb-6 space-y-3">
                    <li>
                        Press <span class="font-mono bg-base-200 px-1">Esc</span> to access the menu. 
                        Menu items are navigated with the up/down arrows on your keyboard. 
                        Press <span class="font-mono bg-base-200 px-1">Enter</span> to select an item in the menu.
                    </li>
                    <li>
                        Select "New Game" and press <span class="font-mono bg-base-200 px-1">Enter</span>.
                    </li>
                    <li>
                        Select the episode, I recommend starting with "Knee-Deep in the Dead".
                    </li>
                    <li>
                        Select the skill level, I recommend starting with "I'm Too Young to Die".
                    </li>
                </ol>
            </section>
            
            <section class="mt-6">
                <h3 class="text-xl font-semibold mb-4">Keyboard Mapping</h3>
                <div class="overflow-x-auto">
                    <table class="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th class="bg-blue-100 text-blue-800">Key</th>
                                <th class="bg-blue-100 text-blue-800">Functionality</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="font-mono bg-base-200">Arrow Keys</td>
                                <td>Move forward/backward and turn left/right</td>
                            </tr>
                            <tr>
                                <td class="font-mono bg-base-200">{'<'} {'>'}</td>
                                <td>Strafe left/right</td>
                            </tr>
                            <tr>
                                <td class="font-mono bg-base-200">Alt</td>
                                <td>Strafe (hold while using arrow keys)</td>
                            </tr>
                            <tr>
                                <td class="font-mono bg-base-200">Shift</td>
                                <td>Run (move faster)</td>
                            </tr>
                            <tr>
                                <td class="font-mono bg-base-200">Spacebar</td>
                                <td>Use doors, switches, and elevators</td>
                            </tr>
                            <tr>
                                <td class="font-mono bg-base-200">Ctrl</td>
                                <td>Fire weapon</td>
                            </tr>
                            <tr>
                                <td class="font-mono bg-base-200">1-8</td>
                                <td>Select weapon</td>
                            </tr>
                            <tr>
                                <td class="font-mono bg-base-200">Tab</td>
                                <td>Show automap</td>
                            </tr>
                            <tr>
                                <td class="font-mono bg-base-200">Esc</td>
                                <td>Access menu</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
} 